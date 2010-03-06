var SuperModel = new SuperClass();

SuperModel.extend({
  records:    [],
  attributes: [],
  idCount:    0,
  
  setup: function(name){
    var result = new SuperClass(SuperModel);
    result.name = name;
    return result;
  },
  
  rawFind: function(id){
    var record = this.records[id];
    if( !record ) throw "Unknown Record";
    return record;
  },

  findByAttribute: function(name, value){
    var result = [];
    for(var record in this.records){
      if(record[name] == value){
        result.push(record.dup());
      }
    }
    return result;
  },

  find: function(id){
    var record = this.rawFind(id);
    return(record.dup());
  },

  all: function(){
    return this.dup(this.records);
  },

  first: function(){
    var record = this.records.slice(0, 1)[0];
    return(record && record.dup());
  },

  last: function(){
    var record = this.records.slice(0, -1)[0];
    return(record && record.dup());
  },

  count: function(){
    return this.records.length;
  },

  deleteAll: function(){
    for(var item in this.records){
      delete this.records[item];
    }
  },

  destroyAll: function(){
    for(var item in this.records){
      item.destroy();
    }
  },

  update: function(id, atts){
    this.find(id).updateAttributes(atts);
  },

  create: function(atts){
    var record = new this(atts);
    record.save();
    return record;
  },

  destroy: function(id){
    this.find(id).destroy();
  },

  dup: function(obj){
    // Prototype compatibility
    if(typeof Object.extend != "undefined"){
      return Object.extend({}, obj)
    } else {
      return jQuery.extend(true, {}, obj);
    }
  }
});  
  
SuperModel.include({
  init: function(atts){
    this.newRecord = true;
    this.load(atts);
  },
  
  isNew: function(){
    return this.newRecord;
  },
  
  save: function(){
    this.isNew() ? this.create() : this.update();
  },
  
  destroy: function(){
    this.rawDestroy();
  },
  
  load: function(attributes){
    for(var name in attributes){
      this[name] = attributes[name];
    }
  },
  
  updateAttribute: function(name, value){
    this[name] = value;
    return this.save();
  },
  
  updateAttributes: function(attributes){
    this.load(attributes);
    return this.save();
  },
    
  dup: function(){
    return this.class.dup(this);
  },
  
  attributes: function(){
    var result = {};
    for(var i in this.class.attributes) {
      var attr = this.class.attributes[i];
      result[attr] = this[attr];
    }
    result.id = this.id;
    return result;
  },
  
  // Private
  
  generateID: function(){
    return(this.class.idCount += 1);
  },
  
  rawDestroy: function(){
    delete this.class.records[this.id];
  },
  
  rawCreate: function(){
    this.class.records[this.id] = this.dup();
  },
  
  create: function(){
    if( !this.id ) this.id = this.generateID();
    this.newRecord = false;
    this.rawCreate();
    return this.id;
  },
  
  rawUpdate: function(){
    var item = this.class.rawFind(this.id);
    item.load(this.attributes());
  },
  
  update: function(){
    this.rawUpdate();
    return true;
  },
});