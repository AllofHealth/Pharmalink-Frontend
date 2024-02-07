import { Icon } from "@/components/icon/Icon";
import Image from "next/image";

const OurTeam = () => {
  return (
    <section className="px-7 mt-20 lg:px-14">
      <h3 className="text-xl gradient-text mt-10 font-bold lg:text-5xl">
        Our Team
      </h3>
      <p className="my-4">
        Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-between">
        <article className="shadow-md rounded-xl w-[300px] ">
          <Image
            src="/assets/images/team-member1.jpg"
            alt="Team member"
            width={140}
            height={208}
            className="w-full rounded-t-xl"
          />
          <div className="px-4 py-6">
            <h4 className="text-xl gradient-text">Bonnie Green</h4>
            <p className="py-4">Senior Front-end Developer</p>
            <span className="mb-4 block">
              Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <div className="flex gap-4">
              <Icon name="Facebook" />
              <Icon name="Twitter" />
              <Icon name="Dribble" />
            </div>
          </div>
        </article>
        <article className="shadow-md rounded-xl w-[300px]">
          <Image
            src="/assets/images/team-member1.jpg"
            alt="Team member"
            width={140}
            height={208}
            className="w-full rounded-t-xl"
          />
          <div className="px-4 py-6">
            <h4 className="text-xl gradient-text">Bonnie Green</h4>
            <p className="py-4">Senior Front-end Developer</p>
            <span className="mb-4 block">
              Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <div className="flex gap-4">
              <Icon name="Facebook" />
              <Icon name="Twitter" />
              <Icon name="Dribble" />
            </div>
          </div>
        </article>
        <article className="shadow-md rounded-xl w-[300px]">
          <Image
            src="/assets/images/team-member1.jpg"
            alt="Team member"
            width={140}
            height={208}
            className="w-full rounded-t-xl"
          />
          <div className="px-4 py-6">
            <h4 className="text-xl gradient-text">Bonnie Green</h4>
            <p className="py-4">Senior Front-end Developer</p>
            <span className="mb-4 block">
              Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <div className="flex gap-4">
              <Icon name="Facebook" />
              <Icon name="Twitter" />
              <Icon name="Dribble" />
            </div>
          </div>
        </article>
        <article className="shadow-md rounded-xl w-[300px]">
          <Image
            src="/assets/images/team-member1.jpg"
            alt="Team member"
            width={140}
            height={208}
            className="w-full rounded-t-xl"
          />
          <div className="px-4 py-6">
            <h4 className="text-xl gradient-text">Bonnie Green</h4>
            <p className="py-4">Senior Front-end Developer</p>
            <span className="mb-4 block">
              Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <div className="flex gap-4">
              <Icon name="Facebook" />
              <Icon name="Twitter" />
              <Icon name="Dribble" />
            </div>
          </div>
        </article>
        <article className="shadow-md rounded-xl w-[300px]">
          <Image
            src="/assets/images/team-member1.jpg"
            alt="Team member"
            width={140}
            height={208}
            className="w-full rounded-t-xl"
          />
          <div className="px-4 py-6">
            <h4 className="text-xl gradient-text">Bonnie Green</h4>
            <p className="py-4">Senior Front-end Developer</p>
            <span className="mb-4 block">
              Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <div className="flex gap-4">
              <Icon name="Facebook" />
              <Icon name="Twitter" />
              <Icon name="Dribble" />
            </div>
          </div>
        </article>
        <article className="shadow-md rounded-xl w-[300px]">
          <Image
            src="/assets/images/team-member1.jpg"
            alt="Team member"
            width={140}
            height={208}
            className="w-full rounded-t-xl"
          />
          <div className="px-4 py-6">
            <h4 className="text-xl gradient-text">Bonnie Green</h4>
            <p className="py-4">Senior Front-end Developer</p>
            <span className="mb-4 block">
              Worem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <div className="flex gap-4">
              <Icon name="Facebook" />
              <Icon name="Twitter" />
              <Icon name="Dribble" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default OurTeam;
