import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import Header
 from "../component/header";
 import Footer from "../component/Footer";
function AboutUs() {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      title: "Wide Range of Destinations",
      desc: " Explore a variety of destinations across Jordan, from historical sites to natural wonders.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: "Secure Payments",
      desc: "Safe and secure payment options to ensure a hassle-free booking experience.",
    },
    {
      icon: (
        <svg
          xmlns=""
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      title: "Detailed Trip Information",
      desc: "Comprehensive details about each trip, including itineraries, highlights, and travel tips.",
    },
  ];

  const team = [
    {
      avatar: "./src/assets/omar.jpg",
      name: "Omar Mohannad",
      title: "Developer",
      desc: "he designs, builds, and maintains software applications and systems to meet user needs and improve functionality.",
      linkedin:
        "https://www.linkedin.com/in/omar-abu-ali-8025022a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      gitHub: "https://github.com/omarAbuali123?tab=repositories",
    },
    {
      avatar: "./src/assets/Moh.jpg",
      name: "Mohamad ramadan",
      title: "Quality assurance",
      desc: "specialist tests and evaluates software products to ensure they meet established standards and are free of defects.",
      linkedin: "https://jo.linkedin.com/in/ramadanuv",
      gitHub: "https://github.com/CyberMan010",
    },
    {
      avatar: "./src/assets/Zeyad.jpg",
      name: "Zeyad Maher",
      title: "Product owner",
      desc: "defines product vision, manages the product backlog, and collaborates with development teams to deliver high-value features and functionality.",
      linkedin: "https://www.linkedin.com/in/zeyad-faiyoumi",
      gitHub: "https://github.com/zeyadfaiyoumi",
    },
    {
      avatar: "./src/assets/sondus.jpg",
      name: "Sondos Saleh",
      title: "Scrum master",
      desc: "facilitates agile practices, supports the development team, and ensures effective collaboration and adherence to Scrum principles.",
      linkedin: "https://www.linkedin.com/in/sondos-alnbabteh-3ab81329a",
      gitHub: "https://github.com/SondosAlnbabteh",
    },
    {
      avatar: "./src/assets/islam.png",
      name: "Islam Omar",
      title: "Developer",
      desc: "creates and implements code to develop software solutions, ensuring performance, scalability, and security.",
      linkedin: "https://www.linkedin.com/in/islam-omar-140165306/",
      gitHub: "https://github.com/islamomer47",
    },
  ];

  return (
    <div>
      <Header/>
      <div
        className="h-screen bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(./src/assets/abouthero.jpg)`,
          height: "39.7rem",
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="w-1/2 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Discover the wonders of Jordan with ease, book your next adventure
              with us!
            </h1>
            <nav className="mb-8 text-white">
              <ol className="inline-flex p-0 list-none">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="text-[#519341] hover:text-white hover:underline transition"
                  >
                    Home
                  </Link>
                  <span className="mx-2">
                    <AiOutlineRight />
                  </span>
                </li>
                <li>About Us</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="pt-10 overflow-hidden">
        <div className="max-w-screen-xl px-4 mx-auto md:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl text-center font-bold text-[#519341]">
                Main features
              </h2>
            </div>
            <div className="grid mt-16 overflow-hidden border divide-x divide-y rounded-lg sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3">
              {features.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="relative p-8 space-y-8 transform">
                    <div className="flex-none w-12 h-12 bg-black text-[#519341] rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-xl font-medium transition group-hover:text-[#519341]">
                        {item.title}
                      </h5>
                      <p className="text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="overflow-hidden py-28">
        <div className="flex flex-wrap items-center max-w-screen-xl px-4 mx-auto md:px-8">
          <div className="w-full lg:w-1/2">
            <div className="items-center hidden gap-8 sm:flex">
              <div className="w-full xl:w-1/2">
                <div className="border border-[#519341] rounded-lg mb-4">
                  <img
                    src="./src/assets/2.jpg"
                    alt="about"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="border border-[#519341] rounded-lg">
                  <img
                    src="./src/assets/1.jpg"
                    alt="about"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full xl:w-1/2 ">
                <div className="relative z-10 border border-[#519341] rounded-lg">
                  <img
                    src="./src/assets/3.jpg"
                    alt="about"
                    className="w-full rounded-lg"
                  />
                  <span className="absolute -right-7 -bottom-7 z-[-1]">
                    <svg
                      width={134}
                      height={106}
                      viewBox="0 0 134 106"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1.66667"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 1.66667 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 16.3333 104)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 31 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 45.6667 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3334"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 60.3334 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 88.6667 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 117.667 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 74.6667 104)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 103 104)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy={104}
                        r="1.66667"
                        transform="rotate(-90 132 104)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 1.66667 89.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 16.3333 89.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 31 89.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="89.3333"
                        r="1.66667"
                        transform="rotate(-90 45.6667 89.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 60.3333 89.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 88.6667 89.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 117.667 89.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 74.6667 89.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 103 89.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="89.3338"
                        r="1.66667"
                        transform="rotate(-90 132 89.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="74.6673"
                        r="1.66667"
                        transform="rotate(-90 1.66667 74.6673)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 1.66667 31.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 16.3333 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 16.3333 31.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 31 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 31 31.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 45.6667 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="31.0003"
                        r="1.66667"
                        transform="rotate(-90 45.6667 31.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 60.3333 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 60.3333 30.9998)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 88.6667 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 88.6667 30.9998)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 117.667 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 117.667 30.9998)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 74.6667 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 74.6667 30.9998)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 103 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 103 30.9998)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="74.6668"
                        r="1.66667"
                        transform="rotate(-90 132 74.6668)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="30.9998"
                        r="1.66667"
                        transform="rotate(-90 132 30.9998)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 1.66667 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 1.66667 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 16.3333 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 16.3333 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 31 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 31 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 45.6667 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 45.6667 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 60.3333 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 60.3333 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 88.6667 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 88.6667 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 117.667 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 117.667 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 74.6667 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 74.6667 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 103 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 103 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="60.0003"
                        r="1.66667"
                        transform="rotate(-90 132 60.0003)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="16.3333"
                        r="1.66667"
                        transform="rotate(-90 132 16.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 1.66667 45.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="1.66667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 1.66667 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 16.3333 45.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="16.3333"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 16.3333 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 31 45.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx={31}
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 31 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="45.3333"
                        r="1.66667"
                        transform="rotate(-90 45.6667 45.3333)"
                        fill="#519341"
                      />
                      <circle
                        cx="45.6667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 45.6667 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 60.3333 45.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="60.3333"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 60.3333 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 88.6667 45.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="88.6667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 88.6667 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 117.667 45.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="117.667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 117.667 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 74.6667 45.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx="74.6667"
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 74.6667 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 103 45.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx={103}
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 103 1.66683)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="45.3338"
                        r="1.66667"
                        transform="rotate(-90 132 45.3338)"
                        fill="#519341"
                      />
                      <circle
                        cx={132}
                        cy="1.66683"
                        r="1.66667"
                        transform="rotate(-90 132 1.66683)"
                        fill="#519341"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pt-10 text-center text-black capitalize lg:w-1/2 ">
            <div className="">
              <h2 className="text-[#519341] mb-8 text-4xl font-bold sm:text-4xl">
                Explore Jordan with Ease
              </h2>
              <p className="mb-8 ml-8 text-base text-body-color">
                Discover Jordan s rich history and stunning landscapes
                effortlessly. With our user-friendly booking, secure payments,
                and 24/7 support, planning your adventure has never been
                simpler. Enjoy exclusive offers and customizable packages,
                ensuring a perfect travel experience. Join us and explore Jordan
                like never before!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-28">
        <div className="max-w-screen-xl px-4 mx-auto text-center md:px-8">
          <div className="text-left">
            <h3 className="text-3xl text-[#519341] flex justify-center font-semibold sm:text-4xl">
              Meet our team
            </h3>
          </div>
          <div className="mt-12">
            <ul className="grid gap-8 sm:grid-cols-3">
              {team.slice(0, 3).map((item, idx) => (
                <li key={idx}>
                  <div className="w-24 h-24 mx-auto ">
                    <img
                      src={item.avatar}
                      className="w-full h-full border-4 border-green-600 rounded-full"
                      alt={item.title}
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold text-black sm:text-lg">
                      {item.name}
                    </h4>
                    <p className="text-[#519341]">{item.title}</p>
                    <p className="mt-2 text-black">{item.desc}</p>
                    <div className="mt-4 flex justify-center gap-4 text-[#519341]">
                      <a href={item.gitHub}>
                        <svg
                          className="w-5 h-5 duration-150 hover:text-blue-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.58 0-.286-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.204.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.47 11.47 0 013.003-.405c1.02.005 2.047.138 3.003.405 2.28-1.552 3.28-1.23 3.28-1.23.655 1.653.245 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.482 5.92.428.37.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .323.217.698.825.58C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"
                          />
                        </svg>
                      </a>
                      <a href={item.linkedin}>
                        <svg
                          className="w-5 h-5 duration-150 hover:text-blue-700"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <g clipPath="url(#clip0_17_68)">
                            <path
                              fill="currentColor"
                              d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_17_68">
                              <path fill="currentColor" d="M0 0h48v48H0z" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="flex justify-center gap-8 mt-8">
              {team.slice(3).map((item, idx) => (
                <li key={idx}>
                  <div className="w-24 h-24 mx-auto">
                    <img
                      src={item.avatar}
                      className="w-full h-full border-4 border-green-600 rounded-full"
                      alt={item.title}
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold text-black sm:text-lg">
                      {item.name}
                    </h4>
                    <p className="text-[#519341]">{item.title}</p>
                    <p className="mt-2 text-black">{item.desc}</p>
                    <div className="mt-4 flex justify-center gap-4 text-[#519341]">
                      <a href={item.gitHub}>
                        <svg
                          className="w-5 h-5 duration-150 hover:text-blue-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.112.82-.262.82-.58 0-.286-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.204.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.47 11.47 0 013.003-.405c1.02.005 2.047.138 3.003.405 2.28-1.552 3.28-1.23 3.28-1.23.655 1.653.245 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.482 5.92.428.37.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .323.217.698.825.58C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"
                          />
                        </svg>
                      </a>
                      <a href={item.linkedin}>
                        <svg
                          className="w-5 h-5 duration-150 hover:text-blue-700"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <g clipPath="url(#clip0_17_68)">
                            <path
                              fill="currentColor"
                              d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_17_68">
                              <path fill="currentColor" d="M0 0h48v48H0z" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default AboutUs;
