from __future__ import annotations

import pandas as pd
from infrastructure.dataframe import DataFrameManager
from infrastructure.client import PcommClient
from service.reset import ResetPcomm
from service.S6CA import RoutineS6CA


class ExecutePcommExtractPVSUnid:

    def routine_S6CA_extract_pvs_unid(self, empresa, login, senha,df: pd.DataFrame, dataframe_manager = DataFrameManager(), log=print) -> pd.DataFrame:
        """
        Extrai a unidade de expedição do pedido
        """

        df_consulta = (
            df[
                [
                    'pedido'
                ]
            ]
            .drop_duplicates(
                subset=['pedido']
            )
            .reset_index(drop=True)
        )

        log("DataFrame carregado")

        with PcommClient() as pcom:

            ResetPcomm.reset_pcom(pcom=pcom)
            log("Resetando PCOM")

            RoutineS6CA.gotoroutineS6CA(pcom)
            log('Tela S6CA pronta para uso')
            
            pcom.send_text('1', 5, 5)
            pcom.send_key('[enter]')
            pcom.wait_ready()

            verif_S6CF = pcom.wait_text(1, 2, 4)
            if verif_S6CF != "S6CF":
                log(f'Verificação de verif_S6CF: {verif_S6CF} não retornou a tela esperada, encerrando tentativa.')

            # Inputs recebidos da interface do usuário
            pcom.send_text(text=empresa, row=3, column=51)
            pcom.send_text(text=login, row=3,column=54)
            pcom.send_text(text=senha, row=3,column=70)

            pcom.send_text('1', 8, 25)
            pcom.send_text('1', 21, 2)
            pcom.send_key('[enter]')
            pcom.wait_ready()

            verif_S6CFM02 = pcom.wait_text(1, 2, 7)

            if verif_S6CFM02 != "S6CFM02":
                log(f'Verificação de verif_S6CFM02: {verif_S6CFM02} não retornou a tela esperada, encerrando tentativa.')

            notas_pendentes = pcom.wait_text(1, 41, 9)

            if notas_pendentes == 'PENDENTES':
                pcom.send_text('n', 16, 46)
                pcom.send_key('[enter]')
                pcom.wait_ready()

            verif_S6AO = pcom.wait_text(1, 2, 7)

            if verif_S6AO != "S6AO":
                log(f'Verificação de verif_S6AO: {verif_S6AO} não retornou a tela esperada, encerrando tentativa.')

            pcom.send_text('1', 5, 2)
            pcom.send_key('[enter]')
            pcom.wait_ready()

            verif_S6AQ = pcom.wait_text(1, 2, 7)

            if verif_S6AQ != "S6AQ":
                log(f'Verificação de verif_S6AQ: {verif_S6AQ} não retornou a tela esperada, encerrando tentativa.')

            reg = []

            for idx, row in enumerate(df.itertuples()):
                pedido = row.pedido

                log(f"Pedido: {pedido} ({type(pedido)})")

                pcom.send_text(pedido, 6, 10)
                pcom.send_key('[enter]')
                pcom.wait_ready()
                pcom.send_key('[pf11]')
                pcom.wait_ready()

                unid_negocio = pcom.wait_text(7, 18, 24)

                reg.append({
                    "pedido": pedido,
                    "unid_negocio": unid_negocio
                })

                pcom.send_key('[pf3]')
                pcom.wait_ready()

            df_ped = pd.DataFrame(reg)

            df = df.merge(
                df_ped,
                on='pedido',
                how='left'
            )

            log('\nroutine_S6CA_extract_pvs_unid - Resultado da extração de unidade de negócio\n')

            return df

    def execute_routine(self, path, empresa, login, senha, log=print):

        dataframe_manager = DataFrameManager()

        df = dataframe_manager.load_csv(caminho=path)

        df = self.routine_S6CA_extract_pvs_unid(empresa=empresa, log=log, login=login, senha=senha,df=df,dataframe_manager=dataframe_manager)

        dataframe_manager.save_csv(path, df=df, sep='\t')