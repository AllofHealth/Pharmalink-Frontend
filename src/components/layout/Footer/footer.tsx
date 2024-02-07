import { Icon } from "@/components/icon/Icon";

export default function Footer() {
  return (
    <footer className="bg-[url('/assets/images/footer-bg.png')] bg-no-repeat bg-contain w-screen mt-20 ">
      <div className="w-11/12 mx-auto mt-20 mb-10 lg:grid lg:grid-cols-3 pt-5">
        <div className="flex gap-8 justify-center lg:col-start-3 lg:row-start-1 lg:mt-20">
          <Icon name="FooterFb" />
          <Icon name="FooterX" />
          <Icon name="FooterGoogle" />
          <Icon name="FooterYoutube" />
        </div>
        <div className="flex justify-between mt-8 lg:col-start-2 lg:row-start-1">
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-3">
                <Icon name="Phone" />
                <p className="text-sm">(406) 555-0120</p>
              </li>
              <li className="flex gap-3">
                <Icon name="Email" />
                <p className="text-sm">allofhealth123@gmail.com</p>
              </li>
              <li className="flex gap-3">
                <Icon name="Location" />
                <p className="text-sm">
                  2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
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
