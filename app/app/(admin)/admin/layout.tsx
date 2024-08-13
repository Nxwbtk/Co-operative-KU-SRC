import { AuthProvider } from "../sign-in/_components/providers";
import { AdminTopbar } from "./_components/top-bar";


export default function SignInLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <AuthProvider>
          <AdminTopbar />
          <div className="pt-20">
          {children}
          </div>
        </AuthProvider>
      </div>
    </>
  );
}
