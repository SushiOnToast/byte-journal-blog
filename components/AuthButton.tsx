'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
    )
  }

  if (session) {
    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center space-x-1 rounded-full">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User avatar'}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white">
              {session.user?.name?.[0] || session.user?.email?.[0] || '?'}
            </div>
          )}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {session.user?.email}
              </p>
            </div>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  return (
    <button
      onClick={() => signIn()}
      className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
    >
      Sign in
    </button>
  )
} 