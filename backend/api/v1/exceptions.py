from rest_framework.exceptions import APIException


class AlreadyExistsException(APIException):
    status_code = 409
    default_detail = 'Entity with given data already exists'
    default_code = 'already_exists'


class ProtectedErrorException(APIException):
    status_code = 400
    default_detail = 'Entity is protected from deletion by another entity'
    default_code = 'protected'
