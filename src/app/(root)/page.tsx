import HeaderBox from "@/components/HeaderBox";
import TotalBalancedBox from "@/components/TotalBalancedBox";

export default function Home() {
  const loggedIn = { firstName: "Erick" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalancedBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.3}
          />
        </header>
      </div>
    </section>
  );
}
