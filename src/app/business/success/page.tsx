'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Mail, Bell, Zap, Lightbulb, AlertTriangle, Loader2, ArrowRight, Sparkles } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-violet-500 animate-spin mx-auto mb-6" />
          <p className="text-lg text-slate-300">Confirming your subscription...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-600/20 rounded-full filter blur-[128px]" />
        </div>

        <Card className="relative z-10 max-w-md w-full glass-dark border-slate-700/50 shadow-2xl">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Something Went Wrong</h1>
            <p className="text-slate-400 mb-8">
              We couldn&apos;t verify your subscription. Please contact support if you completed payment.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full gradient-primary hover:opacity-90 text-white border-0 h-12" size="lg">
                <Link href="/business">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 h-12" size="lg">
                <a href="mailto:cantondetailingpros@gmail.com">Contact Support</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-600/20 rounded-full filter blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/20 rounded-full filter blur-[128px] animate-pulse-slow" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full">
          <Card className="glass-dark border-slate-700/50 shadow-2xl shadow-green-500/10">
            <CardContent className="pt-10 pb-10 text-center">
              {/* Success Icon */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-3">Welcome Aboard!</h1>
              <p className="text-slate-400 mb-2 text-lg">Your subscription is now active.</p>
              <p className="text-slate-500 mb-8">
                Leads for your claimed ZIP code(s) will be delivered to your email as they come in.
              </p>

              {/* What's Next */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8 text-left">
                <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  What Happens Next
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      title: 'Check Your Email',
                      desc: 'You\'ll receive an email confirmation shortly.',
                    },
                    {
                      icon: Bell,
                      title: 'Leads Start Coming',
                      desc: 'Leads will arrive via email as customers submit requests.',
                    },
                    {
                      icon: Zap,
                      title: 'Respond Quickly',
                      desc: 'Contact leads quickly for best conversion rates!',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{item.title}</p>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip */}
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-violet-300 text-left">
                    <span className="font-semibold">Pro Tip:</span> Studies show that responding to leads within 5 minutes increases conversion rates by up to 10x. Keep your phone handy!
                  </p>
                </div>
              </div>

              <Button asChild className="w-full gradient-primary hover:opacity-90 text-white border-0 h-12 text-base font-semibold" size="lg">
                <Link href="/">
                  Back to Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <p className="mt-6 text-sm text-slate-500">
                Have questions?{' '}
                <a href="mailto:cantondetailingpros@gmail.com" className="text-violet-400 hover:underline font-medium">
                  Contact us
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-violet-500 animate-spin mx-auto mb-6" />
            <p className="text-lg text-slate-300">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
