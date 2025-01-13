CREATE TABLE [dbo].[Transactions] (
    [Id]          INT             IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (MAX)  NOT NULL,
    [Amount]      DECIMAL (18, 2) NOT NULL,
    [Date]        DATETIME2 (7)   NOT NULL,
    [Category]    NVARCHAR (MAX)  NOT NULL,
    [IsIncome]    BIT             NOT NULL,
    [Type]        NVARCHAR (MAX)  NOT NULL,
    [UserId]      NVARCHAR (450)  NOT NULL,
    CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Transactions_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

