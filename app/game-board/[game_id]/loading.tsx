import PageLoader from '@/components/loader/page-loader'

export default function Loading() {
   return (
      <div className="flex min-h-screen items-center justify-center">
         <PageLoader />
      </div>
   )
}
