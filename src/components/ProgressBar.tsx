import NextTopLoader from 'nextjs-toploader';

export default function ProgressBar() {
    return (
        <NextTopLoader 
          color="#2299DD"
          height={4}
          showSpinner={false}
        />
    )
}