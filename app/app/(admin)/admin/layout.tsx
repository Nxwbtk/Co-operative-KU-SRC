import { AuthProvider } from "../sign-in/_components/providers";


export default function SignInLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <AuthProvider>{children}</AuthProvider>
      </div>
    </>
  );
}
