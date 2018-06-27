// add a beforeEach for cleaning up state and intitializing the API
import React from 'react'
import axiosMock from 'axios'
import {renderWithRouter, generate, Simulate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  console.log(axiosMock.__mock)
  axiosMock.__mock.reset()
  initAPI()
})
test('login as an existing user', async () => {
  // render the app with the router provider and custom history
  //
  const {
    container,
    getByTestId,
    getByText,
    finishLoading,
    getByLabelText,
  } = renderWithRouter(<App />)
  // wait for the app to finish loading the mocked requests
  //
  await finishLoading()
  // navigate to login by clicking login-link
  //
  const leftClick = {button: 0}
  Simulate.click(getByText('Login'), leftClick)
  expect(window.location.href).toContain('login')
  // fill out the form
  //
  const fakeUser = generate.loginForm()
  const username = getByLabelText('Username')
  const password = getByLabelText('Password')
  const formWrapper = container.querySelector('form')
  username.value = fakeUser.username
  password.value = fakeUser.password
  // submit form

  // first use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  const {post} = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(() => {
    return Promise.resolve({
      data: {user: {...fakeUser, token}},
    })
  })
  // Now simulate a submit event on the form
  //
  Simulate.submit(formWrapper)
  // wait for the mocked requests to finish
  //
  await finishLoading()
  // assert post was called correctly
  // assert localStorage is correct
  // assert the user was redirected (window.location.href)
  // assert the username display is the fake user's username
  // assert the logout button exists
  expect(post).toHaveBeenCalledTimes(1)
  expect(post).toHaveBeenCalledWith('/auth/login', fakeUser)
  expect(window.localStorage.getItem('token')).toBe(token)
  // expect(window.location.href).not.toContain('login')
  expect(getByTestId('username-display').textContent).toContain(
    fakeUser.username,
  )
  expect(getByText('Logout')).toBeTruthy()
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=app.login&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
