import Image from "next/image";

export default function Footer({ user, type = "desktop" }: FooterProps) {
  console.log(type);
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">E</p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-600 font-semibold">
          Erickson
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          ericksjp703@gmail.com
        </p>
      </div>

      <div className="footer_image">
        <Image src="/icons/logout.svg" fill alt="logout" />
      </div>
    </footer>
  );
}
