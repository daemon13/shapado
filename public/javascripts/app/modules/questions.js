var Questions = {
  initialize: function($body) {
    if($body.hasClass("show")) {
      Questions.initialize_on_index($body);
    } else if($body.hasClass("index")) {
      Questions.initialize_on_show($body);
    }
  },
  initialize_on_index: function($body) {
    Ui.navigate_shortcuts($(".questions-index"), ".Question");
    $(".Question .toolbar").shapadoToolbar();
    Votes.initialize_on_questions();
  },
  initialize_on_show: function($body) {
    $(".toolbar").shapadoToolbar({formContainer: "#panel-forms"});
    $(".answer .toolbar, .comment .toolbar").shapadoToolbar({formContainer: ".article-forms", afterFetchForm: function(link, form) {
      Editor.setup(form.find(".markdown_editor, .wysiwyg_editor"));
    }});
    Rewards.initialize();
    Editor.initialize();
    Votes.initialize_on_question();
    Comments.initialize_on_question();
    if(typeof(Jqmath)!='undefined')
      Jqmath.initialize();
  },
  create_on_index: function(data) {
    var section = $("section.questions-index");
    section.prepend(data.html).hide().slideToggle();
  },
  create_on_show: function(data) {
  },
  update_on_index: function(data) {
    var key = "article.Question#"+data.object_id;
    for(var prop in data.changes) {
      if(prop == "title") {
        var n = data.changes[prop].pop();
        $(key+" h2 a").text(n);
      }
    }
  },
  update_on_show: function(data) {
    var key = "section#question.main-question."+data.object_id;
    for(var prop in data.changes) {
      switch(prop) {
        case "title": {
          var n = data.changes[prop].pop();
          $(key+" h1:first").text(n);
        }
        break;
        case "body": {
          var n = data.changes[prop].pop();
          $(key+" .description").html(n);
        }
        break;
      }

    }
  },
  update_widgets: function(data) {

  }
};
