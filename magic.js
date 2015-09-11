var usersCard, aSuit, aRank, aCard, num, card, position, newCard;
var clicks = 0,
    i = 0,
    g = 1,
    l = 0,
    r = 0,
    flyBy = 0,
    suits = [' of Hearts', ' of Clubs', " of Diamonds", ' of Spades'],
    ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    deck = [],
    shuffled = [],
    doveLeft = ['#dove1', '#dove2', '#dove3', '#dove4',],
    doveRight = ['#dove1-2', '#dove2-2', '#dove3-2', '#dove4-2'];

$(document).ready(function(){
  plainDeck();
  swansFly();
  $('#start').on('click', function(){
    flyBy = 100;
    $('.reveal').fadeIn(2500);
    $('#cat1').fadeIn(1500);
    $('#drawCard').css('display', 'inline-block');
    $('#start').css('display', 'none');
  });
  $('#drawCard').on('click', function(){
    $('#drawCard').css('display', 'none');
    play();
  });
});

plainDeck = function(){
  thisDeck = this;
  $.each(thisDeck.suits, function(){
    aSuit = this;
    $.each(thisDeck.ranks, function(){
      aRank = this;
      aCard = aRank + aSuit;
      deck.push(aCard);
    });
    console.log(deck);
  });
  shuffle(51);
};
shuffle = function(m){
  while(m){
    num = Math.floor(Math.random() * m--);
    card = deck[num];
    deck.splice(num, 1);
    shuffled.push(card);
  };
  console.log(shuffled);
  userPicks(51);
};
userPicks = function(p){
  num = Math.floor(Math.random() * p);
  usersCard = shuffled[num];
  position = Math.floor(Math.random() * 8 + 2);
  shuffled.splice(position, 1, usersCard);
  $('#guess').text(usersCard);
  console.log(position + " is the array position. " + usersCard + " is the user's card.");
};

swansFly = function(){
  $('#swanUp').css('left', '30em');
  $('#swanDown').css('left', '85em');
  if(flyBy < 10){
    $('.swan').fadeToggle(1000);
    $('.swan').animate({left: '-80em'}, 15000);
    flyBy++;
    setTimeout(swansFly, 16500);
    $('.swan').fadeToggle(500);
  }
  else{
    $('.swan').css('display', 'none');
  };
};

play = function(){
  $('#prompt').fadeOut();
  $('.heads').fadeOut();
  $('#cardBack').fadeIn(1500);
  $('#guess').delay(2500).fadeIn();
  $('#cardFront').delay(2500).fadeIn();
  $('#dialogue').delay(4000).fadeIn();
  $('#nose').css('display', 'inline-block')
  noseClick();
  cardClick();
};
noseClick = function(){
  $('#nose').on('click', function(){
    if(clicks == 0){
      $('#notCard').css('display', 'inline-block');
      $('#dialogue').hide();
      $('#cardBack').css('z-index', '10');
      $('#guess').text(shuffled[0]);
      $('#cardBack').delay(900).fadeOut('fast');
      $('#dialogue').text("Is this your card? If not, click the card, but if I'm on the nose, touch me there.");
      $('#dialogue').delay(2000).fadeIn();
      clicks = 1;
    }
    else if(shuffled[g - 1] == usersCard){
      $('#skyWin').fadeIn(3000);
      $('#catWin').fadeIn(3000);
      $('#hatWinR').fadeIn(3000);
      $('#hatWinL').fadeIn(3000);
      $('.buttons').hide();
      setTimeout(win, 4000);
    }
    else{
      $('#skyLose').fadeIn(3000);
      $('#catLose').fadeIn(3000);
      $('#hatLoseR').fadeIn(3000);
      $('#hatLoseL').fadeIn(3000);
      $('.buttons').hide();
      setTimeout(lose, 4000);
    };
  });
};
cardClick = function(){
  $('#notCard').on('click', function(){
    $('#dialogue').toggle();
    if(shuffled[g - 1] == usersCard){
      $('#skyLose').fadeIn(3000);
      $('#catLose').fadeIn(3000);
      $('.buttons').hide();
    }
    else{
      $('#guess').text(shuffled[g]);
      $('#dialogue').fadeToggle().text("How 'bout this card?");
    }
    g++;
  });
};

win = function(){
  if(l < doveLeft.length){
    $(doveLeft[l]).fadeToggle(400);
    $(doveLeft[l - 1]).fadeToggle(400);
    $(doveRight[r]).fadeToggle(400);
    $(doveRight[r - 1]).fadeToggle(400);
    l++;
    r++;
    setTimeout(win, 1000);
  }
  else{
    $('#dove4').toggle('explode');
    $('#dove4-2').toggle('explode');
    $('.doves').delay(2700).fadeToggle(2000);
    $('#catBrag').delay(2500).fadeIn(50);
    $('#iWin').delay(3000).show(300) //la coocaracha plays/
  };
};

lose = function(){
  $('#turkeyL1').show().animate({top: '10.5em'}, 500).animate({left: '4em'}, 500).hide();
  $('#turkeyL2').delay(1000).fadeToggle(100).animate({left: '-1em'}, 500).animate({top: '17.5em'}, 500).fadeToggle(50);
  $('#turkeyL3').delay(2000).fadeToggle(50).animate({top: '30em'}, 500).animate({left: '-15em'}, 500).fadeToggle(50);
  $('#turkeyL4').delay(3000).animate({left: '100em'}, 3000);
  $('#turkeyR1').show().delay(2000).animate({top: '10.5em'}, 700).animate({left: '40em'}, 700).delay(500).hide();
  $('#turkeyR2').delay(1000).fadeToggle(100).animate({left: '48em'}, 600).animate({top: '15em'}, 600).fadeToggle(50);
  $('#turkeyR3').delay(2200).fadeToggle(50).animate({top: '30em'}, 600).animate({left: '100em'}, 1000);
  $('#youLose').delay(2300).show();
  $('#catLose').delay(3000).fadeOut(2000);
  $('#turkeyFace').delay(4800).fadeIn(100);
  $('#meatball').delay(6000).fadeIn(50);
  $('#turkeyTongue').delay(7200).fadeIn(50);
}


