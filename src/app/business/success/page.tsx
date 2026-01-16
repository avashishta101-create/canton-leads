'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Mail, Bell, Zap, Lightbulb, AlertTriangle, Loader2 } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
          <p className="text-lg text-slate-300">Confirming your subscription...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="pt-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Something Went Wrong</h1>
            <p className="text-slate-600 mb-8">
              We couldn&apos;t verify your subscription. Please contact support if you completed payment.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
                <Link href="/business">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <a href="mailto:cantondetailingpros@gmail.com">Contact Support</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Success Hero */}
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Welcome Aboard!</h1>
          <p className="text-xl text-slate-300 mb-4">Your subscription is now active.</p>
          <p className="text-slate-400">
            Leads for your claimed ZIP code(s) will be delivered to your email as they come in.
          </p>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              What Happens Next
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  text: "You'll receive an email confirmation shortly.",
                },
                {
                  icon: Bell,
                  text: 'Leads will arrive via email as customers submit requests.',
                },
                {
                  icon: Zap,
                  text: 'Contact leads quickly for best conversion rates!',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="text-slate-700 pt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tip */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <AlertTitle className="text-amber-900">Pro Tip</AlertTitle>
          <AlertDescription className="text-amber-800">
            Studies show that responding to leads within 5 minutes increases conversion rates by up to 10x. Keep your phone handy and respond fast!
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button asChild className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600" size="lg">
            <Link href="/">Return to Home</Link>
          </Button>
          <p className="text-sm text-slate-500">
            Have questions?{' '}
            <a
              href="mailto:cantondetailingpros@gmail.com"
              className="text-blue-500 hover:underline font-medium"
            >
              Contact us
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
            <p className="text-lg text-slate-300">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
