from _typeshed import Incomplete

from influxdb_client.service._base_service import _BaseService

class HealthService(_BaseService):
    def __init__(self, api_client: Incomplete | None = ...) -> None: ...
    def get_health(self, **kwargs): ...
    def get_health_with_http_info(self, **kwargs): ...
    async def get_health_async(self, **kwargs): ...
