// Ezycertify Payment Gateway Configuration
// Obtain your live Razorpay Key ID from https://dashboard.razorpay.com -> Settings -> API Keys

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_517ezycertify'

export const PAYMENT_CONFIG = {
  currency: 'INR',
  companyName: 'Ezycertify Academy',
  description: 'Accredited Certification Training Masterclass',
  themeColor: '#0074e4',
  logo: '/logo.png'
}
