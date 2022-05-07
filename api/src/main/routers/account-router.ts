/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { HttpRequest } from '../../controllers/signup'
import { SignupController } from '../../controllers/signup/signup-controller'
import { AddAccountUseCaseImpl } from '../../data/usecases/add-account-usecase-impl'
import { BCrypterHasher } from '../../infra/criptography/bcrypter-hasher'
import { AccountMongoRepositoy } from '../../infra/repository/mongo/account-mongo-repository'
import { EmailValidation } from '../../validators/email-validation'
import { ValidationComposite } from '../../validators/validation-composite'
import { ValidationEmailField } from '../../validators/validation-email-field'
import { ValidationRequiredField } from '../../validators/validation-required-field'

export default (router: Router): void => {
  router.use('/signup', async (req, res) => {
    const salt = 12
    const validation = new ValidationComposite([
      new ValidationRequiredField('name'),
      new ValidationRequiredField('email'),
      new ValidationRequiredField('password'),
      new ValidationEmailField('email', new EmailValidation())
    ])
    const bcryptAdapterHasher = new BCrypterHasher(salt)
    const addAccountRepository = new AccountMongoRepositoy()
    const addAccountUseCase = new AddAccountUseCaseImpl(bcryptAdapterHasher, addAccountRepository)
    const signupController = new SignupController(validation, addAccountUseCase)
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await signupController.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode)
        .json({
          error: httpResponse.body.message
        })
    }
  })
}
