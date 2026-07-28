from __future__ import annotations

from typing import Optional

import pythoncom
import win32com.client

class PcommClient:

    def __init__(self):
        self.conn_list = None
        self.session = None
        self.ps = None
        self.oia = None

    def connect(self):
        pythoncom.CoInitialize()

        self.conn_list = win32com.client.Dispatch(
            "PCOMM.autECLConnList"
        )

        self.conn_list.Refresh()

        if self.conn_list.Count == 0:
            raise RuntimeError(
                "Nenhuma sessão PCOMM aberta encontrada"
            )

        target = self.conn_list.ConnInfo(1)

        print('Usando sessão:')
        print('Nome', target.name)
        print('Handle', target.Handle)

        self.session = win32com.client.Dispatch(
            "PCOMM.autECLSession"
        )

        self.session.SetConnectionByHandle(
            "PCOMM.autECLSession"
        )

        self.session.SetConnectionByHandle(
            target.Handle
        )