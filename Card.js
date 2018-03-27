// CLASS KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = randomString();
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	// CREATING THE BLOCKS
	function createCard() {
		var card = $('<li class="card animated rubberBand"></li>');
		var cardDeleteBtn = $('<button class="delete_card btn-delete fa fa-trash fa-lg"></button');
		var cardDescription = $('<p class="card-description"></p>');
		
		// ADDING EVENTS
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		card.click(function () {
         	cardDeleteBtn.animate({width:'toggle'}, 250);
    	});

		// CONSTRUCTION CARD ELEMENT
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.element.remove();
      }
    });
}
}


