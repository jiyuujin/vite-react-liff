import React from 'react'
import { useLine } from '../hooks/useLine'
import { useLineInfo } from '../hooks/useLineInfo'
import { useLineMessage } from '../hooks/useLineMessage'
import { useChatForm } from '../hooks/useChatForm'
import { useRecorderForm } from '../hooks/useRecorderForm'
import { SignOutButton } from '../components/SignOutButton'
import { SignInButton } from '../components/SignInButton'
import { SendMessagesButton } from '../components/SendMessagesButton'
import { ChatInput } from '../components/ChatInput'
import { useFirebase } from '../hooks/useFirebase'
import { Recorder } from '../components/Recorder'
import { CHATGPT, RECORDING } from '../utils/features'

const FireTop = () => {
  const { login: loginFirebase, logout: logoutFirebase } = useFirebase()
  const {
    liffObject,
    status,
    login: loginLine,
    logout: logoutLine,
  } = useLine()
  const {
    profile: { displayName, pictureUrl },
    version,
  } = useLineInfo({
    liff: liffObject,
    status,
  })
  const { sendMessages } = useLineMessage({ liff: liffObject, status })
  const { answer, search } = useChatForm()
  const { setBlob } = useRecorderForm()

  const updateBlob = (_blob: Blob | undefined) => {
    setBlob(_blob)
  }

  if (status !== 'inited') {
    return (
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {'Sign in to your account'}
                <SignInButton
                  login={() => {
                    loginFirebase()
                    loginLine()
                  }}
                />
              </h2>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={pictureUrl}
              alt={`${displayName} logo`}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {'You are signed to your account'}
              <SignOutButton
                logout={() => {
                  logoutFirebase()
                  logoutLine()
                }}
              />
            </h2>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              <SendMessagesButton sendMessages={sendMessages} />
            </h2>
            {CHATGPT && (
              <h2 className="grid gap-2 mt-6 text-center text-3xl font-extrabold text-gray-900">
                {answer}
                <ChatInput onSearch={search} />
              </h2>
            )}
            {RECORDING && (
              <h2 className="grid gap-2 mt-6 text-center text-3xl font-extrabold text-gray-900">
                <Recorder onEnd={updateBlob} />
              </h2>
            )}
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>{`${displayName} (${version})`}</div>
          </form>
        </div>
      </div>
    </>
  )
}

export default FireTop
