import { Icon } from "@/components/icon/Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[url('/assets/images/footer-bg.png')] bg-no-repeat bg-contain w-screen mt-20 ">
      <div className="w-11/12 mx-auto mt-20 mb-10 lg:grid lg:grid-cols-3 pt-5">
        <div className="flex gap-8 justify-center lg:col-start-3 lg:row-start-1 lg:mt-20">
          <Link
            href={
              "https://www.facebook.com/profile.php?id=61554748714315&mibextid=kFxxJD"
            }
          >
            <Icon name="FooterFb" />
          </Link>
          <Link
            href={"https://x.com/Allof_Health?t=YnYmKriaVh2hnPJuOgmG-g&s=09"}
          >
            <Icon name="FooterX" />
          </Link>
          <Link
            href={
              "https://www.instagram.com/allof_health?igshid=OGQ5ZDc2ODk2ZA=="
            }
          >
            <Icon name="FooterInstagram" />
          </Link>
          <Link href={"https://www.linkedin.com/company/allof-health/"}>
            <Icon name="FooterLinkedIn" />
          </Link>
        </div>
        <div className="flex justify-between mt-8 lg:col-start-2 lg:row-start-1">
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-3">
                <Icon name="Phone" />
                <p className="text-sm">+234 814 778 2250</p>
              </li>
              <li className="flex gap-3">
                <Icon name="Email" />
                <p className="text-sm">allofhealthhq@gmail.com</p>
              </li>
              <li className="flex gap-3">
                <Icon name="Location" />
                <p className="text-sm">
                  131 OLD ODUKPANI ROAD, CALABAR. NIGERIA
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-1 sm:gap-12">
            <span className="min-w-24">About us</span>
            <span>Services</span>
          </div>
        </div>
        <Icon
          name="AllofHealthLogo"
          className="mx-auto lg:col-start-1 lg:row-start-1"
        />
        <p className="text-center">© 2022 ABC. All rights reserved.</p>
      </div>
    </footer>
  );
}
