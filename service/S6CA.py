from __future__ import annotations

from infrastructure.client import PcommClient
from service.reset import ResetPcomm

class RoutineS6CA:

    @staticmethod
    def gotoroutineS6CA(pcom = PcommClient) -> None:

        ResetPcomm.reset_pcom(pcom)

        pcom.send_key('[enter]')
        pcom.wait_ready()

        verif_COMMAND = pcom.wait_text(23, 2, 7)
        if verif_COMMAND != "COMMAND":
            raise RuntimeError(
                f'Verificação de verif_COMMAND: {verif_COMMAND} n]ao retornou a tela esperada, encerrando tentativa.'
            )

        pcom.send_text('3')
        pcom.send_key('[enter]')
        pcom.wait_ready()
        pcom.send_text('S6CA')
        pcom.send_key('[enter]')

        verif_S6CA = pcom.wait_text(1, 1, 4)
        if verif_S6CA != "S6CA":
            raise RuntimeError(
                f'Verificação de verif_S6CA: {verif_S6CA} não retornou a tela esperada, encerrando tentativa.'
            )

        pcom.wait_ready()
        pcom.send_text('211200d')
        pcom.wait_ready()

        print('Tela S6CA pronta para uso')