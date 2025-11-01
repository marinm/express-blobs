# Blobs

CRUD endpoint for large binary objects

```
Create  POST   /blobs
Read    GET    /blobs/:id
Update  PUT    /blobs/:id
Delete  DELETE /blobs/:id
```

Create a blob:
```
curl -X POST https://marinm.net/blobs --data-binary 'hello world';
```
The response will be something like:
```
{"id":"1d72ac22-480d-4ef8-8adf-1cd483d893c1"}
```

Read a blob:
```
curl https://marinm.net/blobs/:id
```

Update a blob:
```
curl -X PUT https://marinm.net/blobs/:id --data-binary 'hello world updated';
```

Delete a blob:
```
curl -X DELETE https://marinm.net/blobs/:id
```