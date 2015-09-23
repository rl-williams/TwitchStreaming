
$(document).ready(function() {
  
  // array list of streamers
  var streams = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"];
  streams.sort();

  // create html-formatted list of streamers and put them where they belong
  var createStreamerList = function(streams) {
    var streamerList = '';
    for (var i = 0; i < streams.length; i++) {
      streamerList += '<li id="' + streams[i] + '" class="streamerBlock"><a href="http://twitch.tv/' + streams[i] + '"><ul class="streamerInfo"><li id="' + streams[i] + 'Img" class="userImg"><img width="50px" height="50px" src="https://camo.githubusercontent.com/3916ab5649de84523af6b615871a7d9dc445b8ff/687474703a2f2f7777772e6578696e6665726e6f2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031332f30362f7477697463682d74762d707572706c652d6d6574726f2e706e67" /></li><li id="' + streams[i] + 'Name" class="userName"></li><li id="' + streams[i] + 'Status" class="userStat"><span class="glyphicon glyphicon-ban-circle"></span></li><li id="' + streams[i] + 'Description" class="userDescription"></li></ul></a></li>';
    }
    $('#streamerList').append(streamerList);
  };
  
  
  // insert stream and channel data
  var insertStreamData = function(streams) {
    var streamerID, channelsURL, streamsURL;
    
    for (var i = 0; i < streams.length; i++) {
      (function(i) {
        streamerID = streams[i];
        channelsURL = 'https://api.twitch.tv/kraken/channels/' + streamerID + '?callback=?';
        streamsURL = 'https://api.twitch.tv/kraken/streams/' + streamerID + '?callback=?';
        
        $.getJSON(channelsURL, function(channelResults) {
          $('#' + streams[i] + 'Name').html(channelResults.display_name);
          if (channelResults.logo !== null)
            $('#' + streams[i] + 'Img img').attr("src", channelResults.logo);
          if (channelResults.status !== null)
            if (channelResults.status.length > 36) {
              var clippedStatus = channelResults.status.slice(0, 34) + '...';
              $('#' + streams[i] + 'Description').html(clippedStatus).hide();
            }
        });
        
        $.getJSON(streamsURL, function(streamResults) {
          if (streamResults.stream !== null) {
            $('#' + streams[i] + 'Status span').removeClass('glyphicon-ban-circle').addClass('glyphicon-ok-circle');
            $('#' + streams[i] + 'Description').show();
          }
        });
      })(i);
    }
  };
 
  // add functionality for switching tabs
  var switchTabs = function() {
    
    // click All
    $('#allBtn').click(function() {
      $('#onlBtn, #offlBtn').removeClass('arrow');
      $(this).addClass('arrow');
      $('.streamerBlock').show();
    });
    
    // click Online
    $('#onlBtn').click(function() {
      $('#allBtn, #offlBtn').removeClass('arrow');
      $(this).addClass('arrow');
      $('.streamerBlock').show();
      $('.glyphicon-ban-circle').parents(".streamerBlock").hide();
    });
    
    // click Offline
    $('#offlBtn').click(function() {
      $('#allBtn, #onlBtn').removeClass('arrow');
      $(this).addClass('arrow');
      $('.streamerBlock').show();
      $('.glyphicon-ok-circle').parents(".streamerBlock").hide();
    });
  };
  
  // add searchbar functionality
  var searchBar = function() {
    $('#search').keyup(function() {
      var searchVal = $(this).val().toLowerCase();
      if (searchVal == "")
        $('#streamerList > li').show();
      else
        $('#streamerList > li').each(function() {
          var text = $(this).attr('id').toLowerCase();
          (text.indexOf(searchVal) >= 0) ? $(this).show() : $(this).hide();
        });
    });
  };
  
  // function calls
  createStreamerList(streams);
  insertStreamData(streams);
  switchTabs();
  searchBar();
  
});