import { Authentication } from '@/domain/usecases/account'
import { Either } from '@/presentation/helpers/either'
import { UnauthorizedError } from '@/presentation/helpers/errors'

export type AuthAccountResponse = Either<UnauthorizedError, Authentication.Result>
