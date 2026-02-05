import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XCircle, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export default function CanceledPage() {
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-slate-700/30 rounded-full filter blur-[128px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full">
          <Card className="glass-dark border-slate-700/50 shadow-2xl">
            <CardContent className="pt-10 pb-10 text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-slate-400" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-3">Payment Canceled</h1>
              <p className="text-slate-400 mb-8">
                No worries! Your payment was not processed and no charges were made. You can try again
                whenever you&apos;re ready.
              </p>

              {/* Info box */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-8 text-left">
                <p className="text-sm text-slate-400">
                  Your ZIP code selections have not been saved. They&apos;ll still be available for you to claim when you&apos;re ready.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button asChild className="w-full gradient-primary hover:opacity-90 text-white border-0 h-12 text-base font-semibold" size="lg">
                  <Link href="/business#claim-form">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Try Again
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 h-12" size="lg">
                  <Link href="/">
                    Return to Home
                  </Link>
                </Button>
              </div>

              {/* Support link */}
              <p className="mt-8 text-sm text-slate-500">
                Have questions?{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-violet-400 hover:underline font-medium"
                >
                  Contact us
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Benefits reminder */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-4">Remember what you&apos;ll get:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Exclusive Leads', '10+ Leads/Month', 'Cancel Anytime'].map((item, i) => (
                <Badge
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 border-slate-700 text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
