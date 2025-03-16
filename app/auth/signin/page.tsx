import { getProviders } from "next-auth/react"
import SignInButtons from "./SignInButtons"

export default async function SignIn() {
  const providers = await getProviders()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold">Sign In</h1>
        <SignInButtons providers={providers} />
      </div>
    </div>
  )
} 