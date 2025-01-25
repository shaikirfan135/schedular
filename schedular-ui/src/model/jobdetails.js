export default class JobDetails {
    constructor(tableName, selectColumns, whereClause, schema, orderbyColumn, sortDirection) {
        this.tableName = tableName;
        this.selectColumns = selectColumns;
        this.whereClause = whereClause;
        this.schema = schema;
        this.orderbyColumn = orderbyColumn;
        this.sortDirection = sortDirection;
    }

    greet() {
        console.log(`TableName : ${this.tableName} \n
            SelectedColumns : ${this.selectColumns} \n
            Where Clause : ${this.whereClause} \n
            Schema Name : ${this.schema} \n
            OrderBy Column : ${this.orderbyColumn} \n
            SortDirection : ${this.sortDirection}`);
    }

}