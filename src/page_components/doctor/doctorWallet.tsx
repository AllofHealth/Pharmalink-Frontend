import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";

const DoctorWallet = () => {
  const institutions = [
    {
      name: "Nicci Troiani",
      id: "2425666",
      status: "Money in",
      amount: "+$455,00",
      date: "20 Dec 22",
    },
    {
      name: "Nicci Troiani",
      id: "2425666",
      status: "Money in",
      amount: "+$455,00",
      date: "20 Dec 22",
    },
    {
      name: "Nicci Troiani",
      id: "2425666",
      status: "Money in",
      amount: "+$455,00",
      date: "20 Dec 22",
    },
    {
      name: "Nicci Troiani",
      id: "2425666",
      status: "Money in",
      amount: "+$455,00",
      date: "20 Dec 22",
    },
    {
      name: "Nicci Troiani",
      id: "2425666",
      status: "Money in",
      amount: "+$455,00",
      date: "20 Dec 22",
    },
    {
      name: "Nicci Troiani",
      id: "2425666",
      status: "Money in",
      amount: "+$455,00",
      date: "20 Dec 22",
    },
  ];
  return (
    <section>
      <h2 className="text-base lg:text-3xl font-semibold font- mb-2">
        Your Wallet
      </h2>

      <div className="max-w-[350px] mx-auto mb-6">
        <div>
          <h3 className="text-base font-semibold mb-2">Balance</h3>
          <p className="text-3xl font-semibold mb-2">$10,500.00 USD</p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="wallet"
              className="flex gap-2 items-center rounded-2xl"
            >
              <Icon name="Export" />
              Send
            </Button>
            <Button
              variant="wallet"
              className="flex gap-2 items-center rounded-2xl"
            >
              <Icon name="Export" />
              Receive
            </Button>
          </div>
          <div className="flex justify-between mt-8">
            <article className="px-4 py-6 bg-white shadow-lg w-max rounded-2xl">
              <h3 className="text-text-black5 text-sm font-bold mb-2">
                Earning
              </h3>
              <p className="text-text-black5 text-2xl font-bold">$21,500.00</p>
            </article>
            <article className="px-4 py-6 bg-white shadow-lg w-max rounded-2xl">
              <h3 className="text-text-black5 text-sm font-bold mb-2">
                Spending
              </h3>
              <p className="text-text-black5 text-2xl font-bold">$5,392.00</p>
            </article>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-2">Transactions</h2>
        <AllOfHealthTable
          labels={["Name", "ID", "Amount", "Status", "Date"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {institutions.map((institution, index) => (
            <tr className="h-16 text-blue4 font-medium" key={index}>
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {institution.name}
              </td>
              <td className=" text-xs lg:text-base">{institution.id}</td>
              <td className=" text-xs lg:text-base">{institution.amount}</td>
              <td className=" text-xs lg:text-base">{institution.status}</td>
              <td className=" text-xs lg:text-base">{institution.date}</td>
            </tr>
          ))}
        </AllOfHealthTable>
      </div>
    </section>
  );
};

export default DoctorWallet;
