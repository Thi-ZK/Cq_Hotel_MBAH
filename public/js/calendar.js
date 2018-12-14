(function(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var months_start_days = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
    var days_aux_counter = 0;
    var months_number_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var all_calendar_days = document.querySelectorAll(".calendar-day");
    var back = document.querySelector("#calendar-back");
    var forward = document.querySelector("#calendar-forward");
    var year = document.querySelector("#year");
    var month = document.querySelector("#month");
    var y = 1;
    window.__calendar_month = 0; // index
    window.__calendar_year = 2019;

    function calendar_cleaner(){
        for (var i = 0; i < all_calendar_days.length; i++) {
            all_calendar_days[i].innerText = "*";
        }
    }

    calendar_cleaner();
    
    days_aux_counter = months_start_days[window.__calendar_month];
    for(var i = 0; i < days_aux_counter; i++){
        all_calendar_days[i].innerText = "*";
    }

    for(var i = days_aux_counter; i < months_number_of_days[window.__calendar_month] + days_aux_counter; i++){
        all_calendar_days[i].innerText = y;
        y++;
    }


    back.addEventListener("click", function(){
        calendar_cleaner();
        var y = 1;
        window.__calendar_month = window.__calendar_month - 1;

        if(window.__calendar_month == -1){
            if(window.__calendar_year == 2019){
                window.__calendar_month = 0;
            }else{
                window.__calendar_year--;
                window.__calendar_month = 11;
                year.innerText = window.__calendar_year;
            }
        }

        month.innerText = months[window.__calendar_month];
        days_aux_counter = months_start_days[window.__calendar_month];

        for(var i = 0; i < days_aux_counter; i++){
            all_calendar_days[i].innerText = "*";
        }

        for(var i = days_aux_counter; i < months_number_of_days[window.__calendar_month] + days_aux_counter; i++){
            all_calendar_days[i].innerText = y;
            y++;
        }
    });

    forward.addEventListener("click", function(){
        calendar_cleaner();
        var y = 1;
        window.__calendar_month = window.__calendar_month + 1;
        
        if(window.__calendar_month == 12){
            if(window.__calendar_year == 2019){
                window.__calendar_month = 11;
            }else{
                window.__calendar_year++;
                window.__calendar_month = 0;
                year.innerText = window.__calendar_year;
            }
        }

        month.innerText = months[window.__calendar_month];
        days_aux_counter = months_start_days[window.__calendar_month];

        for(var i = 0; i < days_aux_counter; i++){
            all_calendar_days[i].innerText = "*";
        }
        for(var i = days_aux_counter; i < months_number_of_days[window.__calendar_month] + days_aux_counter; i++){
            all_calendar_days[i].innerText = y;
            y++;
        }
    });

}());