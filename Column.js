function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// CREATING COMPONENTS OF COLUMNS
		var column = $('<div class="column animated bounceInDown"></div>').addClass('.column:nth-child(3n+1) .column:nth-child(3n)');
		var columnTitle = $('<h1 class="column-title">' + self.name + '</h1>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<a class="delete_column btn-delete fa fa-trash fa-2x"></a>');
		var columnAddCard = $('<button class="column-add-card btn btn-secondary">Add new card</button>');
		
		// ADDING EVENTS
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
    			url: baseUrl + '/card',
    			method: 'POST',
    			data: {
    			name: cardName,
    			bootcamp_kanban_column_id: self.id
    			},
   				success: function(response) {
        			var card = new Card(response.id, cardName);
        			self.createCard(card);
    			}
			});
		});
			
		// CONSTRUCTION COLUMN ELEMENT
		column.append(columnTitle)
			.append(columnCardList)
			.append(columnDelete)
			.append(columnAddCard)
			return column;
		}
	}

Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
    	var self = this;
    	$.ajax({
      		url: baseUrl + '/column/' + self.id,
      		method: 'DELETE',
      		success: function(response){
        		self.element.remove();
      		}
    	});
 	}
};
