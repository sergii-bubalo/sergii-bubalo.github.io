class Calendar {
    constructor(element, locale, callback) {
        this.element = element;
        this.locale = locale;
        this.callback = callback;
        moment.locale(locale);
        this.show(moment().year());
    }

    show(year) {
        this.year = year;
        var m, d1, t = [], y = '', w = 0, r = 0, n = _.reduce(moment.weekdaysShort(), function(n, ddd) { return n += '<div class="ddd" data-ddd="' + ddd + '"></div>'; }, '');
        for (m = 0; m <= 11; m++) {
            d1 = moment([year, m, 1]);
            t.push('<div class="MMMM">' + moment.months()[m] + '</div>' + n + '<div class="MM"><a href="#" class="' + (year == moment().year() && m == moment().month() && 1 == moment().date() ? 'active ' : '') + 'D" data-d="' + d1.day() + '" data-date="' + year + '-' + ('00' + (m + 1)).slice(-2) + '-01" draggable="false"><span class="num">1</span><div class="content"></div></a>' + _.range(2, d1.daysInMonth() + 1).reduce(function(MM, d) { return MM += '<a href="#" class="' + (year == moment().year() && m == moment().month() && d == moment().date() ? 'active ' : '') + 'D" data-date="' + year + '-' + ('00' + (m + 1)).slice(-2) + '-' + ('00' + d).slice(-2) + '" draggable="false">' + '<span class="num">' + d + '</span>' + '<div class="content"></div></a>'; }, '') + '</div>');
            w = Math.max(w, Math.ceil((d1.day() + d1.daysInMonth()) / 7));
            if (m == 3 || m == 7 || m == 11) {
                y += '<div class="M" data-w="' + w + '">' + t.join('</div><div class="M" data-w="' + w + '">') + '</div>';
                r += w;
                w = 0;
                t = [];
            }
        }
        this.element.innerHTML = '<nav><a href="#" class="nav prev" draggable="false"><svg viewBox="0 0 512 512"><path d="M189.8,349.7c3.1-3.1,3-8,0-11.3L123.4,264H408c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8H123.4l66.3-74.4c2.9-3.4,3.2-8.1,0.1-11.2c-3.1-3.1-8.5-3.3-11.4-0.1c0,0-79.2,87-80,88S96,253.1,96,256s1.6,4.9,2.4,5.7s80,88,80,88c1.5,1.5,3.6,2.3,5.7,2.3C186.2,352,188.2,351.2,189.8,349.7z"/></svg></a><div class="title"><strong>' + year + '</strong></div><a href="#" class="nav next" draggable="false"><svg viewBox="0 0 512 512"><path d="M322.2,349.7c-3.1-3.1-3-8,0-11.3l66.4-74.4H104c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8h284.6l-66.3-74.4c-2.9-3.4-3.2-8.1-0.1-11.2c3.1-3.1,8.5-3.3,11.4-0.1c0,0,79.2,87,80,88s2.4,2.8,2.4,5.7s-1.6,4.9-2.4,5.7s-80,88-80,88c-1.5,1.5-3.6,2.3-5.7,2.3C325.8,352,323.8,351.2,322.2,349.7z"/></svg></a></nav><div class="YYYY" data-w="' + r + '">' + y + '</div>';

        this.element.querySelector('.prev').addEventListener('click', () => { this.show(--this.year); });
        this.element.querySelector('.next').addEventListener('click', () => { this.show(++this.year); });
        this.element.querySelectorAll('.D').forEach((element) => {
            element.addEventListener('click', (event) => {
                var element = event.target;
                while (element) {
                    if (element.hasAttribute('data-date')) {
                        this.callback(element.getAttribute('data-date'));
                        break;
                    } else {
                        element = element.parentElement;
                    }
                }
            });
        });
    }
}

function setEvents(events) {
    let cellsCollection = $(".D").toArray();
    cellsCollection.forEach(function (el) {
        events.forEach(function (elm) {
            if (el.getAttribute('data-date') == elm.date) {
                $(el).find(".content").attr("data-content", elm.event).addClass("ui icon").append("<a class=\"ui green circular mini label add icon\">" + elm.participants.length + "</a>");
            }
        });
    });
}

new Calendar(document.getElementById('calendar'), 'en', function(date) {

});

let events = [
    {
    date: "2017-07-31",
    eventId: 0,
    event: "Play football with Barca squad",
    description: "Call Messi, Neymar Jr., Suarez, Pique & others to make a nice game evening",
    participants: [
            {
                url: "https://www.facebook.com/leomessi",
                avatar: "https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/p200x200/18765665_1835592963126956_3937723892634433677_n.png?oh=adec20c7292d0cf894a262a5430a1047&oe=59FA8675"
            },
            {
                url: "https://www.facebook.com/neymarjr",
                avatar: "https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/p200x200/20294245_1459807980721547_7396043787133845352_n.jpg?oh=cb86de5e04cc19a879953e54eef2438f&oe=59F31359",
            },
            {
                url: "https://www.facebook.com/Luis-Suarez-167866666571743",
                avatar: "https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/p200x200/12592776_1183228901702176_2862588189942196164_n.jpg?oh=10ffb359984527646a95725488630fc4&oe=59F73655",
            }
        ],
    },
    {
        date: "2017-08-01",
        eventId: 1,
        event: "Play football with MU squad",
        description: "Call Pogba & others to make a nice game morning",
        participants: [
            {
            url: "https://www.facebook.com/PaulPogba",
            avatar: "https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/p200x200/19399302_1232211403573258_7402123458727295153_n.jpg?oh=5c30a88bcc537bf1e4201ea6ce24bce2&oe=59FA90F5"
            }
        ],
    },
    {
        date: "2017-08-10",
        eventId: 2,
        event: "Play football with Borussia Dortmund squad",
        description: "Call Pogba & others to make a nice game morning",
        participants: [
            {
                url: "https://www.facebook.com/OfficialLukaszPiszczek",
                avatar: "https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/p200x200/14063957_1175472812523735_1494249396804866480_n.png?oh=6042963d883b9c53b45d68c4c98ef551&oe=5A30A9BC"
            },
            {
                url: "https://www.facebook.com/aubameyang97",
                avatar: "https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/p200x200/19030223_1501496193246199_1263204420880436550_n.jpg?oh=882488a01bbd4f23ea58a9a01f218496&oe=5A375F67"
            },
        ]
    }
];

$('.ui.icon')
    .popup({
        position: "top left",
    });

setEvents(events);

$(".D").on("click",function (e) {
    let date = $(this).attr('data-date');
    events.forEach(function (event) {
        if (event.date == date) {
            $(".ui.small div").remove();
            $(".header").html(event.event);
            $(".description p").html(event.description);
            if (event.participants) {
                $(".ui.small a").attr("href", event.participants[0].url);
                $(".ui.small img").attr('src', event.participants[0].avatar);
                event.participants.forEach(function (el, i) {
                    if (i != 0) {
                        $(".ui.small").append(
                            `<div class=\"ui mini image\"><a href=\"${el.url}\" target=\"_blank\"><img src=\"${el.avatar}\"></a></div>`);
                    }
                });
            }
        }
    });

    $('.ui.modal').modal('show');
});
