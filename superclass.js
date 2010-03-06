var SuperClass = function(parent){
  var result = function(){
    this.init.apply(this, arguments);
  };

  result.prototype.init  = function(){};

  if (parent){
    for(var i in parent){
      result[i] = parent[i]
    }
    for(var i in parent.prototype){
      result.prototype[i] = parent.prototype[i];
    }
    result.super = parent;
    result.prototype.super = parent.prototype;
  }

  result.fn = result.prototype;

  result.extend   = function(obj){
    for(var i in obj){
      result[i] = obj[i];
    }
  };

  result.include = function(obj){
    for(var i in obj){
      result.fn[i] = obj[i];
    }
  };
  
  result.aliasMethod = function(newName, oldName){
    this[newName] = this[oldName];
  };
  result.fn.aliasMethod = result.aliasMethod;
  
  result.aliasMethodChain = function(method, name){
    this.aliasMethod(method + "Without" + name, method);
    this.aliasMethod(method, method + "With" + name);
  };
  result.fn.aliasMethodChain = result.aliasMethodChain;

  result.fn.class = result;

  return result;
};