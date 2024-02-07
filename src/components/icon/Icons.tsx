import Metamask from "../../../public/assets/svgs/metamask.tsx";
import Near from "../../../public/assets/svgs/near.tsx";
import AllofHealthLogo from "../../../public/assets/svgs/all-of-health-logo.tsx";
import Consultation from "../../../public/assets/svgs/consultation.tsx";
import DetailsInfo from "../../../public/assets/svgs/details-info.tsx";
import Drugs from "../../../public/assets/svgs/drugs.tsx";
import FirstAidBox from "../../../public/assets/svgs/first-aid-box.tsx";
import SearchDoctor from "../../../public/assets/svgs/search-doctor.tsx";
import Tracking from "../../../public/assets/svgs/tracking.tsx";
import Facebook from "../../../public/assets/svgs/facebook.tsx";
import Twitter from "../../../public/assets/svgs/twitter.tsx";
import Dribble from "../../../public/assets/svgs/dribbble.tsx";
import FooterFb from "../../../public/assets/svgs/footer-fb.tsx";
import FooterGoogle from "../../../public/assets/svgs/footer-google.tsx";
import FooterX from "../../../public/assets/svgs/footer-x.tsx";
import FooterYoutube from "../../../public/assets/svgs/footer-youtube.tsx";
import Phone from "../../../public/assets/svgs/phone.tsx";
import Email from "../../../public/assets/svgs/email.tsx";
import Location from "../../../public/assets/svgs/location.tsx";

const Menu = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.25 3.5C3.5 3.5 3.5 3.708 3.5 6.25V6.275C3.5 7.382 3.5 8.182 3.771 8.52C4.036 8.848 4.823 9 6.25 9C7.677 9 8.464 8.847 8.729 8.519C9 8.182 9 7.382 9 6.274C9 3.708 9 3.5 6.25 3.5ZM6.25 10.5C4.564 10.5 3.299 10.323 2.604 9.46C2 8.711 2 7.689 2 6.275L2.75 6.25H2C2 3.38 2.181 2 6.25 2C10.319 2 10.5 3.38 10.5 6.25C10.5 7.688 10.5 8.711 9.896 9.46C9.201 10.323 7.936 10.5 6.25 10.5Z"
        fill="#131126"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.25 3.5C14.5 3.5 14.5 3.708 14.5 6.25V6.275C14.5 7.382 14.5 8.182 14.771 8.52C15.036 8.848 15.823 9 17.25 9C18.677 9 19.464 8.847 19.729 8.519C20 8.182 20 7.382 20 6.274C20 3.708 20 3.5 17.25 3.5ZM17.25 10.5C15.564 10.5 14.299 10.323 13.604 9.46C13 8.711 13 7.689 13 6.275L13.75 6.25H13C13 3.38 13.181 2 17.25 2C21.319 2 21.5 3.38 21.5 6.25C21.5 7.688 21.5 8.711 20.896 9.46C20.201 10.323 18.936 10.5 17.25 10.5Z"
        fill="#131126"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.25 14.5C3.5 14.5 3.5 14.708 3.5 17.25V17.275C3.5 18.382 3.5 19.182 3.771 19.52C4.036 19.848 4.823 20 6.25 20C7.677 20 8.464 19.847 8.729 19.519C9 19.182 9 18.382 9 17.274C9 14.708 9 14.5 6.25 14.5ZM6.25 21.5C4.564 21.5 3.299 21.323 2.604 20.46C2 19.711 2 18.689 2 17.275L2.75 17.25H2C2 14.38 2.181 13 6.25 13C10.319 13 10.5 14.38 10.5 17.25C10.5 18.688 10.5 19.711 9.896 20.46C9.201 21.323 7.936 21.5 6.25 21.5Z"
        fill="#131126"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.25 14.5C14.5 14.5 14.5 14.708 14.5 17.25V17.275C14.5 18.382 14.5 19.182 14.771 19.52C15.036 19.848 15.823 20 17.25 20C18.677 20 19.464 19.847 19.729 19.519C20 19.182 20 18.382 20 17.274C20 14.708 20 14.5 17.25 14.5ZM17.25 21.5C15.564 21.5 14.299 21.323 13.604 20.46C13 19.711 13 18.689 13 17.275L13.75 17.25H13C13 14.38 13.181 13 17.25 13C21.319 13 21.5 14.38 21.5 17.25C21.5 18.688 21.5 19.711 20.896 20.46C20.201 21.323 18.936 21.5 17.25 21.5Z"
        fill="#131126"
      />
    </svg>
  );
};

const Icons = {
  Metamask,
  Near,
  AllofHealthLogo,
  Menu,
  Consultation,
  DetailsInfo,
  Drugs,
  FirstAidBox,
  SearchDoctor,
  Tracking,
  Twitter,
  Dribble,
  Facebook,
  FooterFb,
  FooterX,
  FooterGoogle,
  FooterYoutube,
  Phone,
  Email,
  Location,
};

export type IconType = keyof typeof Icons;

export default Icons;
