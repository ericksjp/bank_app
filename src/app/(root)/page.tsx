import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalancedBox from "@/components/TotalBalancedBox";

export default function Home() {
  const loggedIn = {
    firstName: "Erick",
    lastName: "Doe",
    email: "erickDoe@mail.com",
  };
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

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500.5 }]}
      />
    </section>
  );
}
