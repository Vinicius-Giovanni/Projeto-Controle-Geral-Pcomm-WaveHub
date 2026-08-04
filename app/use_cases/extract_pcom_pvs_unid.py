from __future__ import annotations

import pandas as pd
from infrastructure.dataframe import DataFrameManager
from infrastructure.client import PcommClient
from service.reset import ResetService
from service.S6CA import RoutineS6CA


class ExecutePcommExtractPVSUnid:

    def routine_S6CA_extract_pvs_unid(self, df: pd.DataFrame, dataframe_manager = DataFrameManager()) -> pd.DataFrame:
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

        print(df.info())

        with PcommClient() as pcom:

            RoutineS6CA.gotoroutineS6CA(pcom)

            pcom.send_text('1', 5, 5)
            pcom.send_key('[enter]')
            pcom.wait_ready()

            verif_S6CF = pcom.wait_text(1, 2, 4)
            if verif_S6CF != "S6CF":
                raise RuntimeError(
                    f'Verificação de verif_S6CF: {verif_S6CF} não retornou a tela esperada, encerrando tentativa.'
                )

            # Inputs recebidos da interface do usuário
            # pcom.send_text(text=os.getenv('PCOMM_EMP'), row=3, column=51)
            # pcom.send_text(text=os.getenv('PCOMM_USER'), row=3,column=54)
            # pcom.send_text(text=os.getenv('PCOMM_PASSWORD'), row=3,column=70)

            pcom.send_text('1', 8, 25)
            pcom.send_text('1', 21, 2)
            pcom.send_key('[enter]')
            pcom.wait_ready()

            verif_S6CFM02 = pcom.wait_text(1, 2, 7)

            if verif_S6CFM02 != "S6CFM02":
                raise RuntimeError(
                    f'Verificação de verif_S6CFM02: {verif_S6CFM02} não retornou a tela esperada, encerrando tentativa.'
                )

            notas_pendentes = pcom.wait_text(1, 41, 9)

            if notas_pendentes == 'PENDENTES':
                pcom.send_text('n', 16, 46)
                pcom.send_key('[enter]')
                pcom.wait_ready()

            verif_S6AO = pcom.wait_text(1, 2, 7)

            if verif_S6AO != "S6AO":
                raise RuntimeError(
                    f'Verificação de verif_S6AO: {verif_S6AO} não retornou a tela esperada, encerrando tentativa.'
                )

            pcom.send_text('1', 5, 2)
            pcom.send_key('[enter]')
            pcom.wait_ready()

            verif_S6AQ = pcom.wait_text(1, 2, 7)

            if verif_S6AQ != "S6AQ":
                raise RuntimeError(
                    f'Verificação de verif_S6AQ: {verif_S6AQ} não retornou a tela esperada, encerrando tentativa.'
                )

            reg = []

            for idx, row in enumerate(df.itertuples()):
                pedido = row.pedido

                pcom.send_text(pedido, 6, 10)
                pcom.send_key('[enter]')
                pcom.send_key('[pf11]')

                unid_negocio = pcom.wait_text(7, 23, 19)

                reg.append({
                    "pedido": pedido,
                    "unid_negocio": unid_negocio
                })

                pcom.send_key('[pf3]')


            df_nf = dataframe_manager.load_dataframe(reg)

            df = df.merge(
                df_nf,
                on='pedido',
                how='left'
            )

            print(50*"=")
            print('\nroutine_S6CA_extract_pvs_unid - Resultado da extração de unidade de negócio\n')
            print(df.info())
            print(50*"=")

            return df

