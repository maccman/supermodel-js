

SuperModel written in JavaScript. Basically a simple version of ActiveModel.

See [http://github.com/maccman/supermodel](http://github.com/maccman/supermodel)

Examples:

    <script src="javascripts/jquery.js"></script>
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
    </script>
    

## Roadmap

* Add validation
* Add Sqlite (Web Storage) Backend
* [Syncro](http://github.com/maccman/syncro) support via WebSockets