import React, { useEffect, useState } from 'react'
import { AlertCircle, ArrowRight, Check, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { login, register } from '../service/auth.service'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import authBg from '@/assets/auth-bg.png'
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)


export function Auth() {
  const [activeTab, setActiveTab] = useState('login')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const isLogin = activeTab === 'login'

  const getErrorMessage = (error, fallback) => {
    const responseData = error?.response?.data

    if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
      return responseData.errors.map((item) => item.msg).join('. ')
    }

    return responseData?.message || responseData?.error || error?.message || fallback
  }

  useEffect(() => {
    if (!errorMessage) return

    const timeoutId = setTimeout(() => setErrorMessage(''), 5000)
    return () => clearTimeout(timeoutId)
  }, [errorMessage])

  useEffect(() => {
    if (!successMessage) return

    const timeoutId = setTimeout(() => setSuccessMessage(''), 4000)
    return () => clearTimeout(timeoutId)
  }, [successMessage])

  const handleLoginChange = (event) => {
    const { name, value } = event.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (event) => {
    const { name, value } = event.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      await login(loginForm.email, loginForm.password)
      setLoginForm({ email: '', password: '' })
      setSuccessMessage('Sign in successful! Welcome back.')
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Unable to sign in. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    const fullName = `${registerForm.firstName} ${registerForm.lastName}`.trim()

    try {
      await register(fullName, registerForm.email, registerForm.phone, registerForm.password)
      setRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      })
      setSuccessMessage('Account created successfully! Switching to login...')
      setTimeout(() => setActiveTab('login'), 1500)
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Unable to create account. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-stretch overflow-hidden bg-[#0a0a0a] text-white">
      {errorMessage && (
        <div className="pointer-events-none fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-md">
          <Alert variant="destructive" className="pointer-events-auto border-red-500/40 bg-red-950/85 text-red-100">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {successMessage && (
        <div className="pointer-events-none fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-md">
          <Alert variant="success" className="pointer-events-auto">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Decorative background for mobile */}
      <div className="fixed inset-0 z-0 lg:hidden">
        <img src={authBg} alt="" className="h-full w-full object-cover opacity-20 blur-sm" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      {/* Visual Side (Hidden on mobile) */}
      <section className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={authBg} 
            alt="Ecommerce Lifestyle" 
            className="h-full w-full object-cover opacity-60 brightness-75 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 p-2 ring-1 ring-emerald-500/50 backdrop-blur-md">
              <div className="h-full w-full rounded-md bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">SNITCH</span>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
                Exclusive Access
              </span>
              <h2 className="max-w-md text-6xl font-black leading-[1.1] tracking-tighter text-white">
                Elevate Your <span className="italic text-emerald-400">Style</span> Game.
              </h2>
            </div>
            <p className="max-w-md text-xl leading-relaxed font-light text-white/60">
              Join the elite circle of shoppers. Track orders in real-time and discover hand-picked collections tailored for you.
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">50k+</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Active Users</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">4.9/5</span>
                <span className="text-xs uppercase tracking-widest text-white/40">User Rating</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>© 2026 Snitch Inc.</span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white">Privacy</a>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </section>

      {/* Form Side */}
      <section className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:bg-transparent">
        <div className="w-full max-w-420px space-y-10">
          <header className="space-y-3 text-center lg:text-left">
            <div className="flex justify-center mb-8 lg:hidden">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 p-1.5 ring-1 ring-emerald-500/50">
                  <div className="h-full w-full rounded-sm bg-emerald-500" />
                </div>
                <span className="text-xl font-black tracking-tighter text-white">SNITCH</span>
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-base text-white/50">
              {isLogin 
                ? 'Enter your credentials to access your dashboard.' 
                : 'Enter your details below to start your journey.'}
            </p>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid h-12 w-full grid-cols-2 items-center rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
              <TabsTrigger 
                value="login" 
                className="h-full rounded-xl text-sm font-bold text-white/70 hover:text-white transition-all data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="h-full rounded-xl text-sm font-bold text-white/70 hover:text-white transition-all data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Join Now
              </TabsTrigger>
            </TabsList>

            <div className="mt-10 overflow-hidden">
              <TabsContent value="login" className="space-y-6 outline-none transition-all duration-500 animate-in fade-in slide-in-from-right-4">
                <form className="space-y-5" onSubmit={handleLoginSubmit}>
                  <Field label="Email Address" icon={Mail} htmlFor="login-email">
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      className="h-14 border-white/5 bg-white/5 px-5 text-base transition-all focus:border-emerald-500/50 focus:bg-white/[0.07] focus:ring-emerald-500/10"
                      required
                    />
                  </Field>

                  <div className="space-y-2">
                    <Field label="Password" icon={LockKeyhole} htmlFor="login-password">
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className="h-14 border-white/5 bg-white/5 px-5 text-base transition-all focus:border-emerald-500/50 focus:bg-white/[0.07] focus:ring-emerald-500/10"
                        required
                      />
                    </Field>
                    <div className="flex justify-end">
                      <button type="button" className="text-xs font-bold uppercase tracking-widest text-emerald-400 transition-colors hover:text-emerald-300">
                        Forgot password?
                      </button>
                    </div>
                  </div>

      

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group h-14 w-full rounded-2xl bg-emerald-500 text-base font-black text-black shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98]"
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign Into Account'}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6 outline-none transition-all duration-500 animate-in fade-in slide-in-from-left-4">
                <form className="space-y-5" onSubmit={handleRegisterSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" icon={UserRound} htmlFor="reg-first">
                      <Input
                        id="reg-first"
                        name="firstName"
                        placeholder="Jane"
                        value={registerForm.firstName}
                        onChange={handleRegisterChange}
                        className="h-14 border-white/5 bg-white/5 text-base"
                        required
                      />
                    </Field>
                    <Field label="Last Name" icon={UserRound} htmlFor="reg-last">
                      <Input
                        id="reg-last"
                        name="lastName"
                        placeholder="Doe"
                        value={registerForm.lastName}
                        onChange={handleRegisterChange}
                        className="h-14 border-white/5 bg-white/5 text-base"
                        required
                      />
                    </Field>
                  </div>

                  <Field label="Email Address" icon={Mail} htmlFor="reg-email">
                    <Input
                      id="reg-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      className="h-14 border-white/5 bg-white/5 text-base"
                      required
                    />
                  </Field>

                  <Field label="Phone Number" icon={Phone} htmlFor="reg-phone">
                    <Input
                      id="reg-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={registerForm.phone}
                      onChange={handleRegisterChange}
                      className="h-14 border-white/5 bg-white/5 text-base"
                      required
                    />
                  </Field>

                  <Field label="Password" icon={LockKeyhole} htmlFor="reg-password">
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      className="h-14 border-white/5 bg-white/5 text-base"
                      required
                    />
                  </Field>

                  <Field label="Confirm Password" icon={LockKeyhole} htmlFor="reg-confirm-password">
                    <Input
                      id="reg-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      className="h-14 border-white/5 bg-white/5 text-base"
                      required
                    />
                  </Field>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-xl bg-white text-base font-black text-black shadow-xl transition-all hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create New Account'}
                  </Button>
                </form>
              </TabsContent>
            </div>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.2em]">
              <span className="bg-[#0a0a0a] px-6 font-bold text-white/30">Or Connect With</span>
            </div>
          </div>

          <div className="w-full">
            <Button asChild variant="outline" className="h-14 w-full border-white/10 bg-white/2 hover:bg-white text-amber-50 cursor-pointer transition-all active:scale-[0.98]">
              <a href="/api/auth/google"><GoogleIcon /><span className="ml-2">Continue with Google</span></a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Auth
