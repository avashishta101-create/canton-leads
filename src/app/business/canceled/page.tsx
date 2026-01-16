import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function CanceledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full">
        <Card className="shadow-xl">
          <CardContent className="pt-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-slate-500" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-3">Payment Canceled</h1>
            <p className="text-slate-600 mb-8">
              No worries! Your payment was not processed and no charges were made. You can try again
              whenever you&apos;re ready.
            </p>

            {/* Info box */}
            <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm text-slate-600">
                Your ZIP code selections have not been saved. They&apos;ll still be available for you to claim when you&apos;re ready.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
                <Link href="/business#claim-form">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>

            {/* Support link */}
            <p className="mt-8 text-sm text-slate-500">
              Have questions?{' '}
              <a
                href="mailto:cantondetailingpros@gmail.com"
                className="text-blue-500 hover:underline font-medium"
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
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
