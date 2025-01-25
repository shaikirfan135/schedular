class JobDetails {
    constructor(tableName, selectColumns, whereClause, schema, orderbyColumn, sortDirection) {
        this.tableName = tableName;
        this.selectColumns = selectColumns;
        this.whereClause = whereClause;
        this.schema = schema;
        this.orderbyColumn = orderbyColumn;
        this.sortDirection = sortDirection;
    }

    greet() {
        console.log(`Table Name : ${this.tableName} 
            and I am ${this.selectColumns} 
            years old.${this.whereClause} is a
            ${this.schema} was
            ${this.orderbyColumn} and
            ${this.sortDirection} end`);
      }

}

module.exports = JobDetails;