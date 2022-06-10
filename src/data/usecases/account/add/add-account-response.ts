import { AddAccount } from '@/domain/usecases/account'
import { Either } from '@/presentation/helpers/either'
import { EmailInUseError } from '@/presentation/helpers/errors'

export type AddAccountResponse = Either<EmailInUseError, AddAccount.Result>
