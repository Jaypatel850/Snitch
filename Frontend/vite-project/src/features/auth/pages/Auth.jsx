import React, { useState } from 'react'
import { ArrowRight, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'

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

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M17.05 20.28c-.96.95-2.21 1.72-3.72 2.3-1.55.59-3.08.73-4.63.42-1.55-.31-2.9-1-4.04-2.05s-1.95-2.45-2.44-4.18c-.49-1.73-.51-3.48-.05-5.25.46-1.77 1.35-3.23 2.67-4.38s2.85-1.7 4.59-1.65c.87.03 1.72.18 2.53.45.81.27 1.55.6 2.22.98.67.38 1.25.75 1.74 1.11.49.36.85.62 1.08.77.23.15.53.18.89.1.36-.08.72-.25 1.08-.5.36-.25.75-.54 1.17-.87s.9-.68 1.45-1.05c.55-.37 1.2-.68 1.95-.93.75-.25 1.55-.38 2.4-.38 1.45 0 2.7.35 3.75 1.05s1.85 1.75 2.4 3.15c.15.4-.1.75-.45.75-.35 0-.75-.15-1.05-.45-.3-.3-.65-.6-1.05-.9s-.8-.55-1.25-.75-.95-.3-1.5-.3c-.95 0-1.75.25-2.4.75-.65.5-1.2 1.15-1.65 1.95s-.75 1.7-.9 2.7-.2 2-.15 3c.05 1 .2 1.95.45 2.85.25.9.6 1.75 1.05 2.55s.95 1.5 1.5 2.1c.55.6 1.15 1.1 1.8 1.5s1.3 0.7 1.95.9l-.3.9z"/>
  </svg>
)

export function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <main className="flex min-h-screen items-stretch overflow-hidden bg-[#0a0a0a] text-white">
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
        <div className="w-full max-w-[420px] space-y-10">
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

          <Tabs defaultValue="login" onValueChange={(v) => setIsLogin(v === 'login')} className="w-full">
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
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <Field label="Email Address" icon={Mail} htmlFor="login-email">
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-14 border-white/5 bg-white/5 px-5 text-base transition-all focus:border-emerald-500/50 focus:bg-white/[0.07] focus:ring-emerald-500/10"
                      required
                    />
                  </Field>

                  <div className="space-y-2">
                    <Field label="Password" icon={LockKeyhole} htmlFor="login-password">
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
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

                  <div className="flex items-center space-x-3">
                    <div className="relative flex h-5 items-center">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="h-5 w-5 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500/20" 
                      />
                    </div>
                    <label htmlFor="remember" className="text-sm font-medium text-white/50 cursor-pointer select-none">
                      Keep me logged in for 30 days
                    </label>
                  </div>

                  <Button className="group h-14 w-full rounded-2xl bg-emerald-500 text-base font-black text-black shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98]">
                    Sign Into Account
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-6 outline-none transition-all duration-500 animate-in fade-in slide-in-from-left-4">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" icon={UserRound} htmlFor="reg-first">
                      <Input id="reg-first" placeholder="Jane" className="h-14 border-white/5 bg-white/5 text-base" required />
                    </Field>
                    <Field label="Last Name" icon={UserRound} htmlFor="reg-last">
                      <Input id="reg-last" placeholder="Doe" className="h-14 border-white/5 bg-white/5 text-base" required />
                    </Field>
                  </div>

                  <Field label="Email Address" icon={Mail} htmlFor="reg-email">
                    <Input id="reg-email" type="email" placeholder="name@example.com" className="h-14 border-white/5 bg-white/5 text-base" required />
                  </Field>

                  <Field label="Phone Number" icon={Phone} htmlFor="reg-phone">
                    <Input id="reg-phone" type="tel" placeholder="+1 (555) 000-0000" className="h-14 border-white/5 bg-white/5 text-base" required />
                  </Field>

                  <Field label="Password" icon={LockKeyhole} htmlFor="reg-password">
                    <Input id="reg-password" type="password" placeholder="••••••••" className="h-14 border-white/5 bg-white/5 text-base" required />
                  </Field>

                  <Button className="h-14 w-full rounded-2xl bg-white text-base font-black text-black shadow-xl transition-all hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]">
                    Create New Account
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
            <Button variant="outline" className="h-14 w-full border-white/10 bg-white/5 transition-colors hover:bg-white/10">
              <GoogleIcon /> <span className="ml-2">Continue with Google</span>
            </Button>
          </div>

          <footer className="text-center text-sm text-white/40 leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="#" className="font-bold text-white/60 underline underline-offset-4 hover:text-white">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="font-bold text-white/60 underline underline-offset-4 hover:text-white">Privacy Policy</a>.
          </footer>
        </div>
      </section>
    </main>
  )
}

export default Auth
