$(document).ready(function(){
    const INACTIVITY_TIMEOUT = 1000000; //10 MINUTES
    // convert it to whatever time you want
    // 1s=1000ms for 30s->30000ms
    // 1 min = 1*60*1000=60,000ms and so on
    let inactivityTimer;

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logoutUser, INACTIVITY_TIMEOUT);
    };

    const logoutUser = () => {
        //window.location.replace("http://localhost/fleet/index.php");
        window.location.replace("Location: ../index.php");
             //header('Location: ../index.php'); 
    };

    // Attach event listeners to monitor user activity
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);
    document.addEventListener("scroll", resetInactivityTimer);

    // Initialize the timer on page load
    window.onload = resetInactivityTimer;
})