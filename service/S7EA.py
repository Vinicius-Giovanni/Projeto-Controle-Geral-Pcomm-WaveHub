from __future__ import annotations

from infrastructure.client import PcommClient
from service.reset import ResetPcomm

class RoutineS7EA:

    @staticmethod
    def gotoroutineS7EA(pcom = PcommClient) -> None:

        ResetPcomm.reset_pcom(pcom)