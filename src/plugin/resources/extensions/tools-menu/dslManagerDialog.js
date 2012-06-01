/**
 *DSLManager Dialog is used for the dsl management. It interacts with the dsl manager for quick view of dsl commands
 */
var dslManagerDialog;

function DSLManagerDialog() {
    this.editor = window.arguments[0];
    this.dslManager = this.editor.getDSLManager();
}

DSLManagerDialog.prototype = {
    clearAllItems : function(listBox) {
        var itemCount = listBox.getRowCount(), i;
        for (i = 0; i < itemCount; i++) {
            listBox.removeItemAt(0);
        }
    },
    addCell:function(listRow, cellContents) {
        var cell = document.createElement('listcell');
        cell.setAttribute('label', cellContents);
        listRow.appendChild(cell);
    },
    save: function() {
    },
    load:function(dslMgrDialog) {
        try{
            var commandNames = dslMgrDialog.dslManager.getAllCommandNames()
            var dslList = document.getElementById("dslBuilder-list");
            dslList.addEventListener("select", dslMgrDialog.populateCommandList);
            dslMgrDialog.dslList = dslList;

            for (var i = 0; i < commandNames.length; i++)
            {
                var row = document.createElement('listitem');
                // var cell = document.createElement('listcell');
                // cell.setAttribute('label', commandNames[i]);
                // row.appendChild(cell);
                row.setAttribute('label', commandNames[i]);
                dslList.appendChild(row);
            }
        }catch(err) {
            document.getElementById("error-label").value = err;
        }
    },
    populateCommandList:function(event) {
        try{
            var dslList = document.getElementById("dslBuilder-list");
            var commandName, dslCommand, containedCommands, commandList, currentContainedCommand;
            var selectedElement = dslList.getSelectedItem(0);
            if (selectedElement ) {
                commandName = selectedElement.getAttribute("label");
                commandList = document.getElementById("command-list");
                if (commandName) {
                    dslCommand = dslManagerDialog.dslManager.getCommand(commandName);
                    containedCommands = dslCommand.commands;
                    dslManagerDialog.clearAllItems(commandList);
                    for (var i = 0; i < containedCommands.length; i++)
                    {
                        currentContainedCommand = containedCommands[i];
                        var row = document.createElement('listitem');
                        dslManagerDialog.addCell(row, currentContainedCommand.command);
                        dslManagerDialog.addCell(row, currentContainedCommand.target);
                        dslManagerDialog.addCell(row, currentContainedCommand.value);

                        commandList.appendChild(row);
                    }
                }
            }
        }catch(err) {
            document.getElementById("error-label").value = err;
        }
    }

}

DSLManagerDialog.acceptChanges = function() {
    dslManagerDialog.save();
}

DSLManagerDialog.cancelChanges = function() {
    return true;
}

DSLManagerDialog.create = function() {
    dslManagerDialog = new DSLManagerDialog();
    dslManagerDialog.load(dslManagerDialog);
}
