import uuid

print('uuid1: ' + str(uuid.uuid1()))
print('uuid3: ' + str(uuid.uuid3(uuid.NAMESPACE_DNS, 'demo')))
print('uuid4: ' + str(uuid.uuid4()))
print('uuid5: ' + str(uuid.uuid5(uuid.NAMESPACE_DNS, 'demo')))
