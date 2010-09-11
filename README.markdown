
SuperModel written in JavaScript; essentially a simple version of ActiveModel in JavaScript.

See [http://github.com/maccman/supermodel](http://github.com/maccman/supermodel)

Examples:

    <script src="javascripts/jquery.js"></script>
    <script src="javascripts/superclass.js"></script>
    <script src="javascripts/superevent.js"></script>
    <script src="javascripts/supermodel.js"></script>

    <script type="text/javascript" charset="utf-8">
      var Asset = SuperModel.setup("Asset");
      Asset.attributes = ["name"];

      var a = new Asset({name: "My name"});
      a.save();
  
      console.log(Asset.find(a.id).name);
  
      a.name = "My name 2";
  
      console.log(Asset.find(a.id).name);
      a.save();
      console.log(Asset.find(a.id).name);
  
      a.destroy();
  
      // Shouldn't exist
      try {
        console.log(Asset.find(a.id))
      } catch(e) { }
      
      
      // Automatically save data in local database
      Asset.extend(SuperModel.Marshal);
      
      Asset.bind("afterCreate", function(){
        // after create callback
      })
    </script>
    

## Roadmap

* Add validation, at the moment it can be done by throwing errors in filters