import React from 'React'
import ReactDOM from 'react-dom'
import Editor from '../editor.todo'
import * as utils from '../../utils/api'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve())
    }
  }
})

const flushPromise = () => new Promise(resolve => {
  setTimeout(resolve)
})

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange
  // create a fake user, post, history, and api
  const container = document.createElement('div')
  const fakeUser = {
    id: 'foobar'
  }
  const fakeHistory = {
    push: jest.fn()
  }
  //
  // use ReactDOM.render() to render the editor to a div
  //
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)
  //
  // fill out form elements with your fake post
  //
  const form = container.querySelector('form')
  const { title, content, tags } = form.elements
  title.value = 'I like twix'
  title.content = 'Like a lot.. Sorta'
  tags.value = 'twix,   my  , likes '
  //
  // Act
  // submit form
  //
  const submit = new window.Event('submit')
  form.dispatchEvent(submit)
  //
  // wait for promise to settle
  //
  await flushPromise()
  // Assert
  // ensure the create function was called with the right data
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(utils.posts.create).toHaveBeenCalledTimes(1)
  expect(utils.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'my', 'likes'],
    date: expect.any(String) // 难以mock的变量
  })
})
// TODO later...
test('snapshot', () => {})
