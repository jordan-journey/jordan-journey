import Jordan_JOURNEYLogo from "../assets/images/Jordan_JOURNEYLogo.png"

function NavDashboard(){
 
    return(
        

<nav className="bg-gray-200 border-gray-400 dark:bg-gray-900">
  <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={Jordan_JOURNEYLogo} className="h-8" alt="Flowbite Logo" />
  </a>
  
  <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
      </button>
    
    
     
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
  
  </div>

  </div>
</nav>

    );

}

export default NavDashboard;