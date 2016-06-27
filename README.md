Creating mongodb replica set for this test:

## requirements

- docker-machine
- n (github.com/tj/n.git)

```
./startall
```

Test with nodejs

```
cd test
n lts
npm install
./start.sh

# stop master:
docker-machine stop mongo-01

# start mongo-01 (comes up as slave)
docker-machine start mongo-01
```
